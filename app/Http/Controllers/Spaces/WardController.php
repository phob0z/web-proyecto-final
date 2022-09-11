<?php

namespace App\Http\Controllers\Spaces;

use App\Http\Controllers\Controller;
use App\Http\Resources\SpaceResource;
use App\Http\Resources\WardResource;
use App\Models\Ward;
use Illuminate\Http\Request;

class WardController extends Controller
{
    // Creación del constructor
    public function __construct()
    {
        // Uso del gate para que pueda gestionar las cárceles a partir del rol establecido
        $this->middleware('can:manage-wards');
    }

    /**
    *  * @OA\Get(
     ** path="/ward/",
     *   tags={"Administrar pabellones (ROL - DIRECTOR)"},
     *   summary="Listar pabellones de la prision",
     *   operationId="ward",
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
    // Listar los pabellones
    public function index()
    {
        // Obtener la colección de pabellones
        $wards = Ward::orderBy('name', 'asc')->get();
        // Invoca el controlador padre para la respuesta json
        // El moldeo de la información por el Resource
        return $this->sendResponse(message: 'Ward list generated successfully', result: [
            'wards' => SpaceResource::collection($wards)
        ]);
    }

/**
    *  * @OA\Post(
     ** path="/ward/create",
     *   tags={"Administrar pabellones (ROL - DIRECTOR)"},
     *   summary="Crear nuevos pabellones de la prision",
     *   operationId="ward-create",
     *security={
     *  {"passport": {}},
     *   },
     *     @OA\RequestBody(
     *         @OA\JsonContent(),
     *         @OA\MediaType(
     *            mediaType="multipart/form-data",
     *            @OA\Schema(
     *               type="object",
     *               required={"name","location","description",},
     *               @OA\Property(property="name", type="string"),
     *               @OA\Property(property="location", type="string"),
     *               @OA\Property(property="description", type="string"),
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

    // Crear un nuevo pabellon
    public function store(Request $request)
    {
         // Validación de los datos de entrada
         // Crear un array asociativo de clave y valor
        $ward_data = $request -> validate([
            'name' => ['required', 'string', 'min:3', 'max:45'],
            'location' => ['required', 'string', 'min:3', 'max:45'],
            'description' => ['nullable', 'string', 'min:5', 'max:255'],
        ]);

        // https://laravel.com/docs/9.x/eloquent#inserts
        Ward::create($ward_data);
        // Invoca el controlador padre para la respuesta json
        return $this->sendResponse(message: 'Ward stored successfully');
    }

/**
    *  * @OA\Get(
     ** path="/ward/{ward}",
     *   tags={"Administrar pabellones (ROL - DIRECTOR)"},
     *   summary="Listar pabellones especificos de la prision",
     *   operationId="ward-show",
     *security={
     *  {"passport": {}},
     *   },
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

    // Mostrar la información del pabellon
    public function show(Ward $ward)
    {
        // Invoca el controlador padre para la respuesta json
        // El moldeo de la información por el Resource
        return $this->sendResponse(message: 'Ward details', result: [
            'ward' => new WardResource($ward)
        ]);
    }

/**
    *  * @OA\Post(
     ** path="/ward/{ward}/update",
     *   tags={"Administrar pabellones (ROL - DIRECTOR)"},
     *   summary="Actualiza un registro especifico",
     *   operationId="ward-update",
     *security={
     *  {"passport": {}},
     *   },
     *   @OA\Parameter(
     *      name="ward",
     *      in="path",
     *      required=true,
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),
     *
     *     @OA\RequestBody(
     *         @OA\JsonContent(),
     *         @OA\MediaType(
     *            mediaType="multipart/form-data",
     *            @OA\Schema(
     *               type="object",
     *               required={"name","location","description",},
     *               @OA\Property(property="name", type="string"),
     *               @OA\Property(property="location", type="string"),
     *               @OA\Property(property="description", type="string"),
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

    // Actualizar la información del pabellon
    public function update(Request $request, Ward $ward)
    {
         // Validación de los datos de entrada
         // Crear un array asociativo de clave y valor
        $ward_data = $request -> validate([
            'name' => ['required', 'string', 'min:3', 'max:45'],
            'location' => ['required', 'string', 'min:3', 'max:45'],
            'description' => ['nullable', 'string', 'min:5', 'max:255'],
        ]);

        // Actaliza los datos del pabellon
        $ward->fill($ward_data)->save();

        // Invoca el controlador padre para la respuesta json
        return $this->sendResponse(message: 'Ward updated successfully');
    }


/**
    *  * @OA\Get(
     ** path="/ward/{ward}/destroy",
     *   tags={"Administrar pabellones (ROL - DIRECTOR)"},
     *   summary="Deshabilitar pabellones de la prision",
     *   operationId="ward-destroy",
     *security={
     *  {"passport": {}},
     *   },
     *   @OA\Parameter(
     *      name="ward",
     *      in="path",
     *      required=true,
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),
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
    // Dar de baja a un pabellon
    public function destroy(Ward $ward)
    {
        // Obtener el estado del pabellon
        $ward_state = $ward->state;

        // Almacenar un string con el mensaje
        $message = $ward_state ? 'inactivated' : 'activated';

        // Verifica que el pabellon tiene guardias
        if ($ward->users->isNotEmpty())
        {
            return $this->sendResponse(message: 'This ward has assigned guard(s)', code: 403);
        }
        // Cambia el estado del pabellon
        $ward->state = !$ward_state;

        // Guardar en la BDD
        $ward->save();

        // Invoca el controlador padre para la respuesta json
        return $this->sendResponse(message: "Ward $message successfully");
    }

}
