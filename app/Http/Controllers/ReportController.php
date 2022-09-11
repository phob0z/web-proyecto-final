<?php

namespace App\Http\Controllers;

use App\Helpers\ImageHelper;
use App\Http\Resources\ReportResource;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{
    // Se procede a establecer un atributo para el manejo del directorio de las imagenes
    private string $directory_name = 'reports';

    public function __construct()
    {
        // https://laravel.com/docs/9.x/authorization#authorizing-resource-controllers
        $this->authorizeResource(Report::class, 'report');
    }

                /**
    *  * @OA\Get(
     ** path="/report/",
     *   tags={"Administracion de reportes (ROL - GUARDIA)"},
     *   summary="Listar reportes de los guardias",
     *   operationId="reportes",
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
    // Listar los reportes
    public function index()
    {
        // Se obtiene el usuario autenticado
        $user = Auth::user();
        // Del usuario se obtiene los reportes
        $reports = $user->reports;
        // Invoca el controlador padre para la respuesta json
        // El moldeo de la información por el Resource
        return $this->sendResponse(message: 'Report list generated successfully', result: [
            'reports' => ReportResource::collection($reports)
        ]);
    }


 /**
    *  * @OA\Post(
     ** path="/report/create",
     *   tags={"Administracion de reportes (ROL - GUARDIA)"},
     *   summary="Crear un nuevo reporte",
     *   operationId="report-create",
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
     *               required={"title","description","image"},
     *               @OA\Property(property="title", type="string"),
     *               @OA\Property(property="description", type="string"),
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

    // Crear un nuevo reporte
    public function store(Request $request)
    {
        // Validación de los datos de entrada
        $request -> validate([
            'title' => ['required', 'string', 'min:5', 'max:45'],
            'description' => ['required', 'string', 'min:5', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpg,png,jpeg', 'max:512'], //max image size is 512 kb
        ]);

        // Del request se obtiene unicamente los dos campos
        $report_data = $request->only(['title', 'description']);
        // Se crea una nueva instancia (en memoria)
        $report = new Report($report_data);
        // Se obtiene el usuario autenticado
        $user = Auth::user();
        // Del usuario se almacena su reporte en base a la relación
        // https://laravel.com/docs/9.x/eloquent-relationships#the-save-method
        $user->reports()->save($report);
        // Si del request se tiene una imagen se invoca al helper
        if ($request->has('image'))
        {
            $image_path = ImageHelper::getLoadedImagePath(
                uploaded_image: $request['image'],
                directory: $this->directory_name
            );
            // se hace uso del Trait para asociar esta imagen con el modelo report
            $report->attachImage($image_path);
        }

        // Invoca el controlador padre para la respuesta json
        return $this->sendResponse(message: 'Report stored successfully');
    }

    /**
    *  * @OA\Get(
     ** path="/report/{report}",
     *   tags={"Administracion de reportes (ROL - GUARDIA)"},
     *   summary="Visualiza el contenido de un registro especifico",
     *   operationId="report-report-show",
     *security={
     *  {"passport": {}},
     *   },
     *   @OA\Parameter(
     *      name="report",
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


    // Mostrar la información del reporte
    public function show(Report $report)
    {

        // Invoca el controlador padre para la respuesta json
        // El moldeo de la información por el Resource
        return $this->sendResponse(message: 'Report details', result: [
            'report' => new ReportResource($report),
        ]);
    }

 /**
    *  * @OA\Post(
     ** path="/report/{report}/update",
     *   tags={"Administracion de reportes (ROL - GUARDIA)"},
     *   summary="Actualizar un reporte existente",
     *   operationId="report-update",
     *security={
     *  {"passport": {}},
     *   },
     *   @OA\Parameter(
     *      name="report",
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
     *               required={"title","description","image"},
     *               @OA\Property(property="title", type="string"),
     *               @OA\Property(property="description", type="string"),
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

    // Actualizar la información del reporte
    public function update(Request $request, Report $report)
    {
        // Validación de los datos de entrada
        $request -> validate([
            'title' => ['required', 'string', 'min:5', 'max:45'],
            'description' => ['required', 'string', 'min:5', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpg,png,jpeg', 'max:512'], //max image size is 512 kb
        ]);

        // Del request se obtiene unicamente los dos campos
        $report_data = $request->only(['title', 'description']);
        // Actaliza los datos del reporte
        $report->fill($report_data)->save();

        // Si del request se tiene una imagen se invoca al helper
        if ($request->has('image'))
        {
            $image_path = ImageHelper::getLoadedImagePath(
                uploaded_image: $request['image'],
                previous_image_path: $report->image?->path,
                directory: $this->directory_name
            );
            // se hace uso del Trait para asociar esta imagen con el modelo report
            $report->attachImage($image_path);
        }
        // Invoca el controlador padre para la respuesta json
        return $this->sendResponse(message: 'Report updated successfully');
    }

    /**
    *  * @OA\Get(
     ** path="/report/{report}/destroy",
     *   tags={"Administracion de reportes (ROL - GUARDIA)"},
     *   summary="Deshabilita el contenido de un registro especifico",
     *   operationId="report-report-destroy",
     *security={
     *  {"passport": {}},
     *   },
     *   @OA\Parameter(
     *      name="report",
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

    // Dar de baja a un pabellon
    public function destroy(Report $report)
    {
        // Obtener el estado del reporte
        $report_state = $report->state;
        // Almacenar un string con el mensaje
        $message = $report_state ? 'inactivated' : 'activated';
        // Cambia el estado del pabellon
        $report->state = !$report_state;
        // Guardar en la BDD
        $report->save();
        // Invoca el controlador padre para la respuesta json
        return $this->sendResponse(message: "Report $message successfully");
    }


}
