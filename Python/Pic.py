import os
import shutil
import logging


def move_files(source_path, target_path):
    """
    移动文件并记录日志。
    """
    try:
        # 移动文件到目标文件夹（覆盖已存在的文件）
        shutil.move(source_path, target_path)
        logging.info(f"[Success] Moved file: {os.path.basename(source_path)} to {target_path}")
    except Exception as e:
        logging.error(f"[False] Error while moving file: {os.path.basename(source_path)}")
        logging.exception(e)


def transfer_files(source_folders, categories, log_file='transfer_log.txt'):
    """
    将源文件夹中的文件根据分类字典移动到目标文件夹。
    """
    # 配置日志记录器
    logging.basicConfig(
        filename=log_file,  # 输出日志文件
        level=logging.INFO,  # 日志级别为INFO
        format='%(asctime)s - %(message)s'  # 日志格式
    )

    # 创建所有目标文件夹
    for target_folder in categories.values():
        os.makedirs(target_folder, exist_ok=True)

    # 遍历每个源文件夹
    for source_folder in source_folders:
        # 获取源文件夹中的所有文件
        files = [entry.name for entry in os.scandir(source_folder) if entry.is_file()]

        # 遍历每个文件
        for file_name in files:
            # 遍历分类字典
            for keyword, target_folder in categories.items():
                # 指定文件名匹配条件
                if keyword in file_name:
                    # 构建源文件的完整路径
                    source_path = os.path.join(source_folder, file_name)

                    # 构建目标文件夹的完整路径
                    target_path = os.path.join(target_folder, file_name)

                    # 移动文件并记录日志
                    move_files(source_path, target_path)

                    # 文件只能移动到一个分类文件夹，移动后就跳出内层循环
                    break

    logging.info("[Success] 文件转移完成。")

source_folders = [
    'C:/Users/bears/Downloads',

]

categories = {
    'a': 'E:/BackUp/Pic/B/'
    
}

transfer_files(source_folders, categories)