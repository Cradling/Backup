import os
import shutil
import logging

def transfer_files(source_folder, categories):
    # 配置日志记录器
    logging.basicConfig(
        filename=os.path.join(os.getcwd(), 'transfer_log.txt'),  # 输出日志文件在当前目录下的 transfer_log.txt
        level=logging.INFO,  # 日志级别为INFO
        format='%(asctime)s - %(message)s'  # 日志格式
    )

    # 创建所有目标文件夹
    for target_folder in categories.values():
        os.makedirs(target_folder, exist_ok=True)

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

                try:
                    # 移动文件到目标文件夹（覆盖已存在的文件）
                    shutil.move(source_path, target_path)
                    logging.info(f"[Success] Moved file: {file_name} to {target_folder}")
                except Exception as e:
                    logging.error(f"[False] Error while moving file: {file_name}")
                    logging.exception(e)

                # 文件只能移动到一个分类文件夹，移动后就跳出内层循环
                break

    logging.info("[Success] 文件转移完成。")

# 定义 transfer_files 函数
def transfer_files(source_folders, categories):
    for source_folder in source_folders:
        # 处理每个源文件夹的逻辑...
        # 使用 source_folder 进行文件转移，根据需要使用 categories 字典进行分类

# 定义多个源文件夹路径
source_folders = [
    'C:/path/to/source/folder1',
    'C:/path/to/source/folder2',
    'C:/path/to/source/folder3',
]

# 定义固定的分类字典
categories = {
    'a': 'C:/path/to/target/folder/a',
    'b': 'C:/path/to/target/folder/b',
}

# 调用 transfer_files 函数处理多个源文件夹
transfer_files(source_folders, categories)