import { TaskStatus } from 'src/entity/task.entity';

export class TaskDTO {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}
