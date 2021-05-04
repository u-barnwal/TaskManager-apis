import { Body, Controller, Get, Post } from '@nestjs/common';
import { response } from 'express';
import { CreateTaskDTO } from 'src/dto/create-task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  public async getAll() {
    return await this.taskService.getAll();
  }

  @Post()
  public async createOne(@Body() createTaskRequest: CreateTaskDTO) {
    return await this.taskService.createOne(createTaskRequest);
  }
}
