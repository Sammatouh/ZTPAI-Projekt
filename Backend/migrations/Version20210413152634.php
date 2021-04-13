<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210413152634 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE admin_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE booking_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE car_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE location_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "user_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE admin (id INT NOT NULL, id_user_id INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_880E0D7679F37AE5 ON admin (id_user_id)');
        $this->addSql('CREATE TABLE booking (id INT NOT NULL, id_user_id INT NOT NULL, id_car_id INT NOT NULL, pick_up_id INT NOT NULL, drop_off_id INT NOT NULL, value INT NOT NULL, when_booked TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, when_due TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_E00CEDDE79F37AE5 ON booking (id_user_id)');
        $this->addSql('CREATE INDEX IDX_E00CEDDEE5F14372 ON booking (id_car_id)');
        $this->addSql('CREATE INDEX IDX_E00CEDDEC030C75 ON booking (pick_up_id)');
        $this->addSql('CREATE INDEX IDX_E00CEDDEEBBCCCD7 ON booking (drop_off_id)');
        $this->addSql('CREATE TABLE car (id INT NOT NULL, name VARCHAR(255) NOT NULL, image VARCHAR(255) NOT NULL, info TEXT NOT NULL, stock INT NOT NULL, price_per_hour INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE location (id INT NOT NULL, name VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, name VARCHAR(60) NOT NULL, surname VARCHAR(100) NOT NULL, phone VARCHAR(22) NOT NULL, avatar VARCHAR(255) NOT NULL, join_time TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE admin ADD CONSTRAINT FK_880E0D7679F37AE5 FOREIGN KEY (id_user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT FK_E00CEDDE79F37AE5 FOREIGN KEY (id_user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT FK_E00CEDDEE5F14372 FOREIGN KEY (id_car_id) REFERENCES car (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT FK_E00CEDDEC030C75 FOREIGN KEY (pick_up_id) REFERENCES location (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT FK_E00CEDDEEBBCCCD7 FOREIGN KEY (drop_off_id) REFERENCES location (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE booking DROP CONSTRAINT FK_E00CEDDEE5F14372');
        $this->addSql('ALTER TABLE booking DROP CONSTRAINT FK_E00CEDDEC030C75');
        $this->addSql('ALTER TABLE booking DROP CONSTRAINT FK_E00CEDDEEBBCCCD7');
        $this->addSql('ALTER TABLE admin DROP CONSTRAINT FK_880E0D7679F37AE5');
        $this->addSql('ALTER TABLE booking DROP CONSTRAINT FK_E00CEDDE79F37AE5');
        $this->addSql('DROP SEQUENCE admin_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE booking_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE car_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE location_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "user_id_seq" CASCADE');
        $this->addSql('DROP TABLE admin');
        $this->addSql('DROP TABLE booking');
        $this->addSql('DROP TABLE car');
        $this->addSql('DROP TABLE location');
        $this->addSql('DROP TABLE "user"');
    }
}
