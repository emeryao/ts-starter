import { exec, ExecOptionsWithStringEncoding, ExecOptionsWithBufferEncoding, ExecOptions } from 'child_process';

export function execAsync(command: string, options?: ExecOptionsWithStringEncoding, logErr: boolean = true): Promise<boolean | string> {
    return new Promise<boolean | string>((resolve, reject) => {
        exec(command, options, (err, stdout, stderr) => {
            if ((stderr) || err) {
                if (logErr) {
                    console.log('stderr: ', stderr);
                }
                resolve(false);
            } else {
                resolve(stdout || true);
            }
        });
    });
}
