
all: dist

dev:
    npx sapper dev

check:
	npx jshint *.js src/**.js

dist: build
	npx sapper export --build=false --build-dir=out/build out/dist

build: lib/env.js node_modules
	npx sapper build out/build

node_modules:
	npm install

lib/env.js:
	sed -E 's/%FAUNADB_TOKEN%/${FAUNADB_TOKEN}/' > lib/env.js < lib/env.template.js
	tail -v -n50 lib/env.js

clean:
	rm lib/env.js

# reconfigure
config: clean lib/env.js
