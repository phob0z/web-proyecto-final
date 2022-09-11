<?php

namespace App\Http\Controllers\Assignment;

use App\Http\Controllers\Controller;
use App\Http\Resources\SpaceResource;
use App\Http\Resources\UserResource;
use App\Models\Role;
use App\Models\User;
use App\Models\Ward;
use Illuminate\Http\Request;

class GuardToWardController extends Controller
{
    // Creación del constructor
    public function __construct()
    {
        // Uso del gate para que pueda asignar guardias a pabellones a partir del rol establecido
        $this->middleware('can:manage-assignment');

        // Uso del middleware para que pueda asignar guardias a pabellones a partir del rol establecido
        $this->middleware('verify.ward.assignment')->only('assign');
    }

               /**
    *  * @OA\Get(
     ** path="/assignment/guards-and-wards",
     *   tags={"Asignacion guardias - pabellones (ROL - DIRECTOR)"},
     *   summary="Listar los guardias asignados a pabellones",
     *   operationId="assignment(guards-wards)",
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

    // Métodos del Controlador
    // Listar los guardias y pabellones disponibles
    public function index()
    {
        // Traer el rol guardia
        $role = Role::where('slug', "guard")->first();

        // Traer los usuarios a partir de ese rol
        $guards = $role->users;

        // https://laravel.com/docs/9.x/eloquent#cursors
        // https://laravel.com/docs/9.x/collections#method-filter
        // Por cada pabellon que se va a iterar
        $wards = Ward::cursor()->filter(function ($ward)
        {
            // Se obtiene el número de usuarios (guardias)
            $total_users = $ward->users->count();

            // Se retorna los registros a partir de la siguiente condición
            return 2 > $total_users && $ward->state;

        // https://laravel.com/docs/9.x/collections#method-listing
        })->all();

        // Invoca el controlador padre para la respuesta json
        // El moldeo de la información por los respectivos Resources
        return $this->sendResponse(message: 'Assignment between Guards and wards generated successfully', result: [
            'users' => UserResource::collection($guards),
            'wards' => SpaceResource::collection($wards)
        ]);
    }

                  /**
    *  * @OA\Get(
     ** path="/assignment/guard-to-ward/{user}/{ward}",
     *   tags={"Asignacion guardias - pabellones (ROL - DIRECTOR)"},
     *   summary="Asignar guardias a pabellones",
     *   operationId="assignment-guard-ward ",
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
     *   @OA\Parameter(
     *      name="ward",
     *      in="path",
     *      required=true,
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),
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
    // Método para realizar la asignación respectiva
    public function assign(User $user, Ward $ward)
    {

        // Obtener solo los id de los pabellones de los usuarios
        // https://laravel.com/docs/9.x/eloquent-collections#method-modelKeys
        $guards_wards_id = $user->wards->modelKeys();

        // https://laravel.com/docs/9.x/eloquent-relationships#syncing-associations
        $user->wards()->syncWithPivotValues($guards_wards_id, ['state' => false]);

        $user->wards()->sync([$ward->id]);

        // Invoca el controlador padre para la respuesta json
        // El moldeo de la información por el Resource
        return $this->sendResponse(message: 'Assignment updated successfully', result: [
            'user' => new UserResource($user),
            'ward' => $ward
        ]);
    }

}
