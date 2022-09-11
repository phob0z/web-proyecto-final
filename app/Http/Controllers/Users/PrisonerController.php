<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PrisonerController extends UserController
{
    // Se crea el constructor para el controlador
    public function __construct()
    {
        // Se porcede a establecer el gate
        // https://laravel.com/docs/9.x/authorization#via-middleware
        $this->middleware('can:manage-prisoners');
        // Se establece el rol para este usuario
        $role_slug = "prisoner";
        // Se establece que si puede recibir notificaciones
        $can_receive_notifications = false;
        // Se hace uso del controlador padre
        parent::__construct($role_slug,$can_receive_notifications);
    }

/**
    *  * @OA\Get(
     ** path="/prisoner/",
     *   tags={"Administracion de prisioneros (ROL - ADMIN)"},
     *   summary="Listar los prisioneros de la prision",
     *   operationId="prisoner",
     *security={
     *  {"passport": {}},
     *   },
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

    public function indexPrisoner()
    {

    }

                /**
    *  * @OA\Post(
     ** path="/prisoner/create",
     *   tags={"Administracion de prisioneros (ROL - ADMIN)"},
     *   summary="Crear un nuevo registro de director",
     *   operationId="prisoner-create",
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

    public function storePrisoner()
    {

    }



    /**
    *  * @OA\Get(
     ** path="/prisoner/{user}",
     *   tags={"Administracion de prisioneros (ROL - ADMIN)"},
     *   summary="Visualiza el contenido de un registro especifico",
     *   operationId="prisoner-user-show",
     *security={
     *  {"passport": {}},
     *   },
     *   @OA\Parameter(
     *      name="user",
     *      in="path",
     *      required=true,
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),
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

    public function showPrisoner()
    {

    }


/**
    *  * @OA\Post(
     ** path="/prisoner/{user}/update",
     *   tags={"Administracion de prisioneros (ROL - ADMIN)"},
     *   summary="Actualiza un registro especifico",
     *   operationId="prisoner-update",
     *security={
     *  {"passport": {}},
     *   },
     *   @OA\Parameter(
     *      name="user",
     *      in="path",
     *      required=true,
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),
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

    public function updatePrisoner()
    {

    }


    /**
    *  * @OA\Get(
     ** path="/prisoner/{user}/destroy",
     *   tags={"Administracion de prisioneros (ROL - ADMIN)"},
     *   summary="Deshabilita un registro especifico",
     *   operationId="prisoner-user-destroy",
     *security={
     *  {"passport": {}},
     *   },
     *   @OA\Parameter(
     *      name="user",
     *      in="path",
     *      required=true,
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),
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



    public function destroyPrisoner()
    {

    }
}
