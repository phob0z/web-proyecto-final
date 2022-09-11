<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\Rules\Password as PasswordValidator;
use Illuminate\Auth\Events\PasswordReset;

class PasswordController extends Controller
{
    /**
    *  * @OA\Post(
     ** path="/forgot-password",
     *   tags={"Login"},
     *   summary="Proporciona tu email para enviarte un link para reestablecer tu contraseña",
     *   operationId="forgot-password",
     *     @OA\RequestBody(
     *         @OA\JsonContent(),
     *         @OA\MediaType(
     *            mediaType="multipart/form-data",
     *            @OA\Schema(
     *               type="object",
     *               required={"email"},
     *               @OA\Property(property="email", type="string"),
     *            ),
     *        ),
     *    ),
     *   @OA\Response(
     *      response=200,
     *       description="Success",
     *      @OA\MediaType(
     *           mediaType="application/json",
     *      )
     *   ),
     *   @OA\Response(
     *      response=401,
     *       description="Unauthenticated"
     *   ),
     *   @OA\Response(
     *      response=400,
     *      description="Bad Request"
     *   ),
     *   @OA\Response(
     *      response=404,
     *      description="not found"
     *   ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      )
     * )
    **/

    // Función para el manejo del reseteo de contraseña
    public function resendLink(Request $request)
    {
        // Validación de los datos de entrada
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        // enviar el link de restablecimiento de contraseña al mail
        // https://laravel.com/docs/9.x/passwords#requesting-the-password-reset-link
        $status = Password::sendResetLink(
            $request->only('email')
        );

        // Se invoca a la función padre
        return $status === Password::RESET_LINK_SENT
            ? $this->sendResponse(__($status))
            : $this->sendResponse(
                message: 'Link reset failure.',
                errors: ['email' =>__($status)],
                code: 422
            );
    }


    /**
    *  * @OA\Post(
     ** path="/reset-password/",
     *   tags={"Login"},
     *   summary="Cambia tus credenciales si olvidaste tu contraseña con el link proporcionado anteriormente",
     *   operationId="reset-password",
     *     @OA\RequestBody(
     *         @OA\JsonContent(),
     *         @OA\MediaType(
     *            mediaType="multipart/form-data",
     *            @OA\Schema(
     *               type="object",
     *               required={"token","email","password","password_confirmation"},
     *               @OA\Property(property="token", type="string"),
     *               @OA\Property(property="email", type="string"),
     *               @OA\Property(property="password", type="string"),
     *               @OA\Property(property="password_confirmation", type="string"),
     *            ),
     *        ),
     *    ),
     *   @OA\Response(
     *      response=200,
     *       description="Success",
     *      @OA\MediaType(
     *           mediaType="application/json",
     *      )
     *   ),
     *   @OA\Response(
     *      response=401,
     *       description="Unauthenticated"
     *   ),
     *   @OA\Response(
     *      response=400,
     *      description="Bad Request"
     *   ),
     *   @OA\Response(
     *      response=404,
     *      description="not found"
     *   ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      )
     * )
    **/
    // Función para enviar el redirect del formulario para restablecer la contraseña
    public function redirectReset(Request $request)
    {
        $frontend_url = env('APP_FRONTEND_URL');
        $token = $request->route('token');
        $email = $request->email;
        $url = "$frontend_url/?token=$token&email=$email";
        return $this->sendResponse(message: 'Successful redirection', result: ['url' => $url]);
    }

    // Función para la actualización del password
    public function restore(Request $request)
    {
        // Validación de los datos de entrada
        $validated = $request -> validate([
            'token' => ['required', 'string'],
            'email' => ['required', 'string', 'email'],
            // https://laravel.com/docs/9.x/validation#rule-confirmed
            'password' => [
                'required', 'string', 'confirmed',
                PasswordValidator::defaults()->mixedCase()->numbers()->symbols(),
            ],
        ]);

        // Función para cambiar el password
        $status = Password::reset($validated, function ($user , $password)
        {
            // Establece el nuevo password
            $user->password = Hash::make($password);
            // Grabar los cambios
            $user->save();
            // https://laravel.com/docs/9.x/passwords#password-reset-handling-the-form-submission
            event(new PasswordReset($user)); // Actualizar la contraseña en tiempo real
        });

        // Se invoca a la función padre
        return $status == Password::PASSWORD_RESET
            ? $this->sendResponse(__($status))
            : $this->sendResponse(
                message: 'Reset password failure.',
                errors: ['email' =>__($status)],
                code: 422
            );
    }

/**
    *  * @OA\Post(
     ** path="/update-password/",
     *   tags={"Logout"},
     *   summary="Actualiza tu contraseña si ya estas autenticado",
     *   operationId="update-password",
     *security={
     *  {"passport": {}},
     *   },
     *     @OA\RequestBody(
     *         @OA\JsonContent(),
     *         @OA\MediaType(
     *            mediaType="multipart/form-data",
     *            @OA\Schema(
     *               type="object",
     *               required={"password","password_confirmation"},
     *               @OA\Property(property="password", type="string"),
     *               @OA\Property(property="password_confirmation", type="string"),
     *            ),
     *        ),
     *    ),
     *   @OA\Response(
     *      response=200,
     *       description="Success",
     *      @OA\MediaType(
     *           mediaType="application/json",
     *      )
     *   ),
     *   @OA\Response(
     *      response=401,
     *       description="Unauthenticated"
     *   ),
     *   @OA\Response(
     *      response=400,
     *      description="Bad Request"
     *   ),
     *   @OA\Response(
     *      response=404,
     *      description="not found"
     *   ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      )
     * )
    **/
    // Función para actualizar el password del suuario
    public function update(Request $request)
    {
        // Validación de los datos de entrada
        $validated = $request -> validate([
        'password' => ['required', 'string', 'confirmed',
                        PasswordValidator::defaults()->mixedCase()->numbers()->symbols()]]);
        $user = $request->user();
        $user->password = Hash::make($validated['password']);
        $user->save();
        return $this->sendResponse('Password updated successfully');
    }

}
