export interface Config {
    gateway_client_host: string;
    gateway_client_port: number;

    gateway_server_port: number;

    photo_directory_path: string;
    log_file_path: string;

    photo_watcher_interval: number;
    max_photo_download_time: number;

    logfile_name: string;
}
