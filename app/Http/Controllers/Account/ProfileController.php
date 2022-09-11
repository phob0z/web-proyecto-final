<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProfileResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

/**
    *  * @OA\Get(
     ** path="/profile/",
     *   tags={"Administracion de perfil"},
     *   summary="Ver profile",
     *   operationId="profile-show",
     *security={
     *  {"passport": {}},
     *   },
     *
     *
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



class ProfileController extends Controller
{
    // función para mostrar los datos de perfil del usuario
    public function show()
    {
        // Se obtiene el usuario autenticado
        // https://laravel.com/docs/9.x/authentication#retrieving-the-authenticated-user
        $user = Auth::user();
        // Se invoca a la función padre
        return $this->sendResponse(message: "User's profile returned successfully", result: [
            'user' => new ProfileResource($user),
            'avatar' => $user->getAvatarPath()
        ]);
    }


    /**
    *  * @OA\Post(
     ** path="/profile/",
     *   tags={"Administracion de perfil"},
     *   summary="Actualizar datos del perfil",
     *   operationId="profile-store",
     *security={
     *  {"passport": {}},
     *   },
     *     @OA\RequestBody(
     *         @OA\JsonContent(),
     *         @OA\MediaType(
     *            mediaType="multipart/form-data",
     *            @OA\Schema(
     *               type="object",
     *               required={"username","first_name","last_name","email","birthdate","home_phone","personal_phone","address"},
     *               @OA\Property(property="username", type="string"),
     *               @OA\Property(property="first_name", type="string"),
     *               @OA\Property(property="last_name", type="string"),
     *               @OA\Property(property="email", type="string"),
     *               @OA\Property(property="birthdate", type="string"),
     *               @OA\Property(property="home_phone", type="string"),
     *               @OA\Property(property="personal_phone", type="string"),
     *               @OA\Property(property="address", type="string"),
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


    // función para actualizar los datos del usuario
    public function store(Request $request)
    {
        // Validar que el usuario sea mayor de edad
        $allowed_date_range =[
            'max' => date('Y-m-d', strtotime('-70 years')),
            'min' => date('Y-m-d', strtotime('-18 years')),
        ];

        // Validación de los datos de entrada
        $request -> validate([
            'first_name' => ['required', 'string', 'min:3', 'max:35'],
            'last_name' => ['required', 'string', 'min:3', 'max:35'],
            // https://laravel.com/docs/9.x/validation#rule-unique
            'username' => ['required', 'string', 'min:5', 'max:20',Rule::unique('users')->ignore($request->user()->id)],
            // https://laravel.com/docs/9.x/validation#rule-after
            'birthdate' => ['nullable', 'string', 'date_format:Y-m-d',"after_or_equal:{$allowed_date_range['max']}",
                            "before_or_equal:{$allowed_date_range['min']}"],
            'personal_phone' => ['required', 'numeric', 'digits:10'],
            'home_phone' => ['nullable', 'numeric', 'digits:9'],
            'address' => ['required', 'string', 'min:5', 'max:50'],
    ]);

        // Se obtiene el modelo del usuario
        $user = $request->user();
        // Se actualiza el modelo en la BDD
        // https://laravel.com/docs/9.x/queries#update-statements
        $user->update($request->all());
        // Se invoca a la función padre
        return $this->sendResponse('Profile updated successfully');
    }

}
