import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from 'src/dto/create-task.dto';
import { TaskDTO } from 'src/dto/task.dto';
import { UpdateTaskDTO } from 'src/dto/update-task.dto';
import { Task, TaskStatus } from 'src/entity/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  public async getAll() {
    const tasks: Task[] = await this.taskRepository.find();

    return tasks.map((task) => TaskDTO.fromEntity(task));
  }

  public async getOne(id: number) {
    const task: Task = await this.taskRepository.findOne(id);

    if (!task)
      throw new NotFoundException(`Task with the id ${id} was not found!`);

    return TaskDTO.fromEntity(task);
  }

  public async createOne(createTaskRequest: CreateTaskDTO) {
    const task: Task = new Task();

    task.title = createTaskRequest.title;
    task.description = createTaskRequest.description;
    task.status = TaskStatus.Created;

    await this.taskRepository.save(task);

    return TaskDTO.fromEntity(task);
  }

  public async updateOne(id: number, updateTaskRequest: UpdateTaskDTO) {
    // fetch and check if the task exists
    const task: Task = await this.getOne(id);

    // check which properties are set in the dto
    task.title = updateTaskRequest.title || task.title;
    task.description = updateTaskRequest.description || task.description;
    task.status = updateTaskRequest.status || task.status;

    // update the properties on the task
    await this.taskRepository.save(task);

    // return the task as a dto
    return TaskDTO.fromEntity(task);
  }
}
