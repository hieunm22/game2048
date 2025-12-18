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
	docker container stop game
	docker container rm game
	docker image rm game

docker:
	docker build -t game -f Dockerfile .
	docker run --name game -ditp 6666:80 --restart unless-stopped game
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
