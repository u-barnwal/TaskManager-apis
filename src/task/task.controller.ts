import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { response } from 'express';
import { CreateTaskDTO } from 'src/dto/create-task.dto';
import { UpdateTaskDTO } from 'src/dto/update-task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  public async getAll() {
    return await this.taskService.getAll();
  }

  @Get('/:id')
  public async getOne(@Param('id') id: number) {
    return await this.taskService.getOne(id);
  }

  @Post()
  public async createOne(@Body() createTaskRequest: CreateTaskDTO) {
    return await this.taskService.createOne(createTaskRequest);
  }

  @Put('/:id')
  public async updateOne(
    @Param('id') id: number,
    @Body() updateTaskRequest: UpdateTaskDTO,
  ) {
    return await this.taskService.updateOne(id, updateTaskRequest);
  }
}
