from pathlib import Path
from pprint import pprint

for file in Path("./scribbles/").glob("*.md"):

    if file.name.startswith("prose-"):
        continue

    with open("./scribbles/" + file.name, "r") as f:
        content = f.readlines()

    Path("./scribbles/" + file.name).unlink()
    
    with open("./scribbles/" + file.name, "w+") as f:

        new_out = content.copy()

        for i in range(5, len(content) - 1):

            if ("<pre>" in content[i] or "</pre>" in content[i]):
                new_out[i] = ""
            elif len(content[i].strip()) == 0:
                new_out[i] = "<br/>"
            else:
                new_out[i] = content[i].replace("\n", "<br/>")

        f.writelines(new_out)
