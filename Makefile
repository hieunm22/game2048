setup-env:
	yarn
	git checkout HEAD -- yarn.lock

reset:
	rm -rf build
	rm -rf node_modules
	rm -rf coverage
	rm -f .env.local
	git reset --hard

destroy:
	docker container stop game2048
	docker container rm game2048
	docker image rm game2048

docker:
	docker build -t game2048 -f Dockerfile .
	docker run --name game2048 -ditp 3002:80 --restart unless-stopped game2048
	rm -rf build

publish:
	yarn build
	make destroy
	make docker

start:
	make setup-env
	yarn dev

package:
	yarn
	git checkout HEAD -- yarn.lock
	yarn dev
