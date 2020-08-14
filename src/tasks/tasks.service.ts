import { Injectable } from '@nestjs/common';
import { ITask } from './interfaces/task.interface';
import { CreateTaskDto } from './dto/tasks.dto';

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
