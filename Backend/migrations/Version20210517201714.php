<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210517201714 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE car (id INT NOT NULL, name VARCHAR(255) NOT NULL, image VARCHAR(255) NOT NULL, info TEXT NOT NULL, stock INT NOT NULL, price_per_hour INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE rental (id INT NOT NULL, renter_id INT NOT NULL, car_id INT NOT NULL, value INT NOT NULL, when_booked TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, when_due TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_1619C27DE289A545 ON rental (renter_id)');
        $this->addSql('CREATE INDEX IDX_1619C27DC3C6F69F ON rental (car_id)');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, name VARCHAR(100) NOT NULL, surname VARCHAR(120) NOT NULL, phone VARCHAR(24) NOT NULL, join_time TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON "user" (email)');
        $this->addSql('ALTER TABLE rental ADD CONSTRAINT FK_1619C27DE289A545 FOREIGN KEY (renter_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE rental ADD CONSTRAINT FK_1619C27DC3C6F69F FOREIGN KEY (car_id) REFERENCES car (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE rental DROP CONSTRAINT FK_1619C27DC3C6F69F');
        $this->addSql('ALTER TABLE rental DROP CONSTRAINT FK_1619C27DE289A545');
        $this->addSql('DROP TABLE car');
        $this->addSql('DROP TABLE rental');
        $this->addSql('DROP TABLE "user"');
    }
}
