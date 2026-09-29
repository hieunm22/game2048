# deploy targets, run from the repo root. the vps job in .github/ calls publish-sync.
IMAGE := game2048
CONTAINER := game2048
PORT := 3002

.PHONY: install build destroy docker publish publish-sync setup-env reset start package

install:
	yarn install --frozen-lockfile

build:
	yarn build

# an image still in use cannot be removed, the container goes first. a first
# deploy has neither, and a missing one is not an error
destroy:
	-docker container stop $(CONTAINER)
	-docker container rm $(CONTAINER)
	-docker image rm $(IMAGE)

# build/ is copied into the image, nothing on the host reads it afterwards
docker:
	docker build -t $(IMAGE) -f Dockerfile .
	docker run --name $(CONTAINER) -ditp $(PORT):80 --restart unless-stopped $(IMAGE)
	rm -rf build

publish: destroy docker

publish-sync: install build publish

setup-env:
	yarn
	git checkout HEAD -- yarn.lock

reset:
	rm -rf build
	rm -rf node_modules
	rm -rf coverage
	rm -f .env.local
	git reset --hard

start:
	make setup-env
	yarn dev

package:
	yarn
	git checkout HEAD -- yarn.lock
	yarn dev
