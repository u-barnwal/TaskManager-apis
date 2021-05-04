import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from 'src/dto/create-task.dto';
import { TaskDTO } from 'src/dto/task.dto';
import { Task, TaskStatus } from 'src/entity/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  public async createOne(createTaskRequest: CreateTaskDTO) {
    const task: Task = new Task();

    task.title = createTaskRequest.title;
    task.description = createTaskRequest.description;
    task.status = TaskStatus.Created;

    await this.taskRepository.save(task);

    return TaskDTO.fromEntity(task);
  }

  public async getAll() {
    const tasks: Task[] = await this.taskRepository.find();

    return tasks.map((task) => TaskDTO.fromEntity(task));
  }
}
