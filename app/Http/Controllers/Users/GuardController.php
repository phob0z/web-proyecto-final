<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;



class GuardController extends UserController
{
    // Se crea el constructor para el controlador
    public function __construct()
    {
        // Se porcede a establecer el gate
        // https://laravel.com/docs/9.x/authorization#via-middleware
        $this->middleware('can:manage-guards');
        // Se establece el rol para este usuario
        $role_slug = "guard";
        // Se establece que si puede recibir notificaciones
        $can_receive_notifications = true;
        // Se hace uso del controlador padre
        parent::__construct($role_slug,$can_receive_notifications);
    }

       /**
    *  * @OA\Get(
     ** path="/guard/",
     *   tags={"Administracion de guardias (ROL - ADMIN)"},
     *   summary="Listar los guardias de la prision",
     *   operationId="guard",
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

    public function indexGuard()
    {

    }

            /**
    *  * @OA\Post(
     ** path="/guard/create",
     *   tags={"Administracion de guardias (ROL - ADMIN)"},
     *   summary="Crear un nuevo registro de guardia",
     *   operationId="guard-create",
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

    public function storeGuard()
    {

    }



    /**
    *  * @OA\Get(
     ** path="/guard/{user}",
     *   tags={"Administracion de guardias (ROL - ADMIN)"},
     *   summary="Visualiza el contenido de un registro especifico",
     *   operationId="guard-user-show",
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

    public function showGuard()
    {

    }


/**
    *  * @OA\Post(
     ** path="/guard/{user}/update",
     *   tags={"Administracion de guardias (ROL - ADMIN)"},
     *   summary="Actualiza un registro especifico",
     *   operationId="guard-update",
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

    public function updateGuard()
    {

    }


    /**
    *  * @OA\Get(
     ** path="/guard/{user}/destroy",
     *   tags={"Administracion de guardias (ROL - ADMIN)"},
     *   summary="Deshabilita un registro especifico",
     *   operationId="guard-user-destroy",
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



    public function destroyGuard()
    {

    }

}
