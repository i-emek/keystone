.PHONY: bootstrap dev format lint test health infra-up infra-provision infra-down

bootstrap:
	./scripts/bootstrap.sh

dev:
	./scripts/dev.sh

format:
	./scripts/format.sh

lint:
	./scripts/lint.sh

test:
	./scripts/test.sh

health:
	./scripts/healthcheck.sh

infra-up:
	docker compose -f deploy/docker/docker-compose.yml up -d postgres ministack elasticmq

infra-provision:
	./scripts/provision-local.sh

infra-down:
	docker compose -f deploy/docker/docker-compose.yml down