import { Task, TaskStatus } from 'src/entity/task.entity';

export class TaskDTO {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;

  public static fromEntity(task: Task): TaskDTO {
    const taskDTO = new TaskDTO();

    taskDTO.id = task.id;
    taskDTO.title = task.title;
    taskDTO.description = task.description;
    taskDTO.status = task.status;

    return taskDTO;
  }
}
