import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/tasks.dto';
import { TasksService } from './tasks.service';
import { Response } from 'express';

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
