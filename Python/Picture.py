import os
import shutil

# 源文件夹路径
source_folder = 'C:/Users/bears/Downloads'

# 分类文件夹字典，键为文件名匹配条件，值为目标文件夹路径
categories = {
    #'a': 'E:/BackUp/Pic/B/',
}

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
                print(f"Moved file: {file_name} to {target_folder}")
            except shutil.Error as e:
                print(f"Error while moving file: {file_name}")
                print(e)
            
            # 文件只能移动到一个分类文件夹，移动后就跳出内层循环
            break