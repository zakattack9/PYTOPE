import argparse, subprocess, sys

parser = argparse.ArgumentParser(
  description='PYTOPE installation and setup tool.', 
  prog='pytope'
)
parser.add_argument(
  'env',
  choices=['dev', 'test'],
  nargs='?',
  default='dev',
  help='Specifies what Docker environment to build and run'
)
parser.add_argument(
  '-b', '--build',
  action='store_true', 
  help='Specifies whether to build or rebuild the image'
)

args = parser.parse_args()
# print(args)

# check if Docker is installed
hasDocker = not subprocess.run(['command', '-v', 'docker'], capture_output=True).returncode
if (hasDocker):
  print('[PYTOPE] Docker is installed')
else:
  print('[PYTOPE] Docker is not installed; please install before rerunning')
  sys.exit(0)

# get current directory
pwd = subprocess.run(['pwd'], capture_output=True).stdout.decode().strip()
# print(pwd)

# create volume argument value
vol = '{}:/root/pytope'.format(pwd)
# print(vol)

# build/rebuild Docker image if specified
if (args.env == 'dev' and args.build):
  print('[EXECUTING] docker build -t pytope:dev -f Dockerfile.dev .')
  subprocess.run(['docker', 'build', '-t', 'pytope:dev', '-f', 'Dockerfile.dev', '.'])
elif (args.env == 'test' and args.build):
  print('[EXECUTING] docker build -t pytope:test -f Dockerfile.test .')
  subprocess.run(['docker', 'build', '-t', 'pytope:test', '-f', 'Dockerfile.test', '.'])

# run Docker image and boot PYTOPE
if (args.env == 'dev'):
  print('[EXECUTING] docker run --rm -it -v "{}" -p 127.0.0.1:3000:3000 pytope:dev'.format(vol))
  print('[PYTOPE] Starting dev container; head to localhost:3000 once the React server finishes startup')
  subprocess.run(['docker', 'run', '--rm', '-it', '-v', vol, '-p', '127.0.0.1:3000:3000', 'pytope:dev'])
elif (args.env == 'test'):
  print('[EXECUTING] docker run --rm -it -p 127.0.0.1:3000:3000 pytope:test')
  print('[PYTOPE] Starting test container; head to localhost:3000 once the React server finishes startup')
  subprocess.run(['docker', 'run', '--rm', '-it', '-p', '127.0.0.1:3000:3000', 'pytope:test'])
