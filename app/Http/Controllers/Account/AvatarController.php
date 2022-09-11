<?php

namespace App\Http\Controllers\Account;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

 /**
    *  * @OA\Post(
     ** path="/profile/avatar",
     *   tags={"Administracion de perfil"},
     *   summary="Actualizar avatar del perfil",
     *   operationId="avatar",
     *security={
     *  {"passport": {}},
     *   },
     *
     *     @OA\RequestBody(
     *         @OA\JsonContent(),
     *         @OA\MediaType(
     *            mediaType="multipart/form-data",
     *            @OA\Schema(
     *               type="object",
     *               required={"image"},
     *               @OA\Property(property="image", type="file"),
     *            ),
     *        ),
     *    ),
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
     *  @OA\Response(
     *      response=422,
     *      description="The image field is required"
     *   ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      )
     * )
    **/


class AvatarController extends Controller
{
    public function store(Request $request)
    {
        // Validación de los datos de entrada
        $request -> validate([
            'image' => ['required', 'image', 'mimes:jpg,png,jpeg', 'max:512'],
        ]);

        // Se obtiene el usario que esta haciendo el Request
        $user = $request->user();
        // Se invoca la función del helper
        // Pasando a la función la imagen del request
        $uploaded_image_path = ImageHelper::getLoadedImagePath(
            $request['image'],
            // https://styde.net/nuevo-operador-nullsafe-en-php-8/
            $user->image?->path,
            'avatars'
        );

        // Se hace uso del Trait para asociar esta imagen con el modelo user
        $user->attachImage($uploaded_image_path);
        // Uso de la función padre
        return $this->sendResponse('Avatar updated successfully');

    }

}
