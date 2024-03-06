import { shell } from "./shell.function";

export function stopAllTasks(region: string, profile: string, cluster: string, service: string) {
    const task = shell(`aws ecs list-tasks --profile ${profile} --region ${region} --cluster ${cluster} --service ${service} --output text --query taskArns[0]`);

    if(task && task.toLowerCase().trim() !== 'none') {
        shell(`aws ecs stop-task --profile ${profile} --region ${region} --cluster  ${cluster} --task ${task}`);
    }
}