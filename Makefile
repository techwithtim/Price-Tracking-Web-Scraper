# To run the backend servers
backend: create_env run_server 

create_env : 
	cd Backend ; \
	if [ ! -d env ]; then python -m venv env; fi; \
	if [ ! -d env ]; then source env/bin/activate; fi; \
	if [ ! -d env ]; then pip install -r requirements.txt; fi; \
	if [ ! -d env ]; then playwright install; fi; \

run_server : 
	cd Backend ; \
	source env/bin/activate ; \
	which python ; \
	python app.py

# To run the frontend server
frontend: run_client

run_client : 
	cd Frontend ; \
	npm i ; \
	npm run start

