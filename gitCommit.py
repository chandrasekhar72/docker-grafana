import subprocess
from time import sleep

def executeCommand():
    subprocess.run(["git", "fetch", "--prune", "origin"], shell=True)
    subprocess.run(["git", "pull"], shell=True)
    subprocess.run(["git", "add", "."], shell=True)
    subprocess.run(["git", "commit", "-m", "feat: implement or modified code"], shell=True)
    subprocess.run(["git", "push"], shell=True)
    subprocess.run(["git", "pull"], shell=True)

executeCommand()
input("Press Enter to exit...")