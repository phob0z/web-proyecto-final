<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;



class DirectorController extends UserController
{

    // Se crea el constructor para el controlador
    public function __construct()
    {
        // Se porcede a establecer el gate
        // https://laravel.com/docs/9.x/authorization#via-middleware
        $this->middleware('can:manage-directors');
        // Se establece el rol para este usuario
        $role_slug = "director";
        // Se establece que si puede recibir notificaciones
        $can_receive_notifications = true;
        // Se hace uso del controlador padre
        parent::__construct($role_slug,$can_receive_notifications);
    }

            /**
    *  * @OA\Get(
     ** path="/director/",
     *   tags={"Administracion de directores (ROL - ADMIN)"},
     *   summary="Listar directores de la prision",
     *   operationId="director",
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

    public function indexDirector()
    {

    }

         /**
    *  * @OA\Post(
     ** path="/director/create",
     *   tags={"Administracion de directores (ROL - ADMIN)"},
     *   summary="Crear un nuevo registro de director",
     *   operationId="director-create",
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

    public function storeDirector()
    {

    }



    /**
    *  * @OA\Get(
     ** path="/director/{user}",
     *   tags={"Administracion de directores (ROL - ADMIN)"},
     *   summary="Visualiza el contenido de un registro especifico",
     *   operationId="director-user-show",
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

    public function showDirector()
    {

    }


/**
    *  * @OA\Post(
     ** path="/director/{user}/update",
     *   tags={"Administracion de directores (ROL - ADMIN)"},
     *   summary="Actualiza la informacion de un registro especifico",
     *   operationId="director-update",
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

    public function updateDirector()
    {

    }


    /**
    *  * @OA\Get(
     ** path="/director/{user}/destroy",
     *   tags={"Administracion de directores (ROL - ADMIN)"},
     *   summary="Deshabilita un registro especifico",
     *   operationId="director-user-destroy",
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



    public function destroyDirector()
    {

    }

}
