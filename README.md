# Agilesoft

Prueba de conocimientos técnicos para práctica profesional

## Pre-requisitos :clipboard:

| Requirimientos                               | Versión |
| -------------------------------------------- | ------- |
| [Node](https://nodejs.org/en/)               | 12.18.1 |
| [Nest](https://nestjs.com)                   | 7.4.1   |
| [TypeScript](https://www.typescriptlang.org) | 3.7.4   |

Una vez descargado o clonado el repositorio, y cumpliendo los pre-requisitos, solo es necesario ejecutar el comando `npm start`

## Problema

Se requiere desarrollar una API Rest para un sistema TODO List con las siguientes funcionalidades:

- [x] Obtener listado de tareas y su estado
- [x] Agregar tarea
- [x] Marcar tarea como resuelta

## Solución

Para solucionar este problema se implementó un módulo de nest llamado tasks, el cual está dividido en servicios y controladores.

Dado que para la solución no se requiere utilizar una base de datos, estos serán almacenados en memoria utilizando un array, el cual será parte del servicio.

El servicio es el responsable de almacenar y solicitar los datos y está diseñado para ser utilizado por el controlador.

Dado que los datos que debe contener una tarea son nombre, estado y descripción, se asume que el nombre de las mismas debe ser único para cada tarea.

```js
@Injectable()
export class TasksService {
  private readonly tasks: ITask[] = [];

  getTasks(): ITask[] {
    return this.tasks;
  }

  addTask(task: CreateTaskDto): number {
    return this.tasks.push(task);
  }

  resolveTask(name: string): ITask {
    let index = this.tasks.findIndex(item => item.name === name);
    this.tasks[index].state = true;
    return this.tasks[index];
  }
}
```

Para añadir una tarea a la API, se requieren los siguientes datos:

```js
export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly state: boolean;

  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
```

Los datos mostrados anteriormente, son validados mediante decoradores, verificando que cumplan el tipo de dato solicitado, y que estos no estén vacíos.

El controlador se encarga de recibir las peticiones y enviar una respuesta al cliente, consumiendo el servicio mencionado anteriormente.

```js
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Res() res: Response): Response {
    const tasks = this.taskService.getTasks();
    return res.status(HttpStatus.OK).json({ tasks });
  }

  @Post()
  createTask(@Res() res: Response, @Body() task: CreateTaskDto): Response {
    this.taskService.addTask(task);
    return res.status(HttpStatus.OK).json({ message: 'task created', task });
  }

  @Put(':name')
  resolveTask(@Res() res: Response, @Param('name') name: string): Response {
    const task = this.taskService.resolveTask(name);
    return res.status(HttpStatus.OK).json(task);
  }
}
```

Para acceder a los datos, es necesario acceder a la ruta `/tasks` mediante el método `Get`

Para añadir una tarea a la API, es necesario acceder a la ruta `/tasks` mediante el método `Post`, el cual requiere los datos mencionados anteriormente.

Para asignar una tarea como resuelta, es necesario acceder a la ruta `/tasks/nombre de la tarea` mediante el método `Put`, esto no requiere ningun dato, dado que busca la tarea y modifica su estado.
