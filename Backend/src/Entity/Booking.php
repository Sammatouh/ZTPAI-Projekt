<?php

namespace App\Entity;

use App\Repository\BookingRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=BookingRepository::class)
 */
class Booking
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="bookings")
     * @ORM\JoinColumn(nullable=false)
     */
    private $id_user;

    /**
     * @ORM\ManyToOne(targetEntity=Car::class, inversedBy="bookings")
     * @ORM\JoinColumn(nullable=false)
     */
    private $id_car;

    /**
     * @ORM\Column(type="integer")
     */
    private $value;

    /**
     * @ORM\Column(type="datetime")
     */
    private $when_booked;

    /**
     * @ORM\Column(type="datetime")
     */
    private $when_due;

    /**
     * @ORM\ManyToOne(targetEntity=Location::class, inversedBy="bookings")
     * @ORM\JoinColumn(nullable=false)
     */
    private $pick_up;

    /**
     * @ORM\ManyToOne(targetEntity=Location::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $drop_off;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdUser(): ?User
    {
        return $this->id_user;
    }

    public function setIdUser(?User $id_user): self
    {
        $this->id_user = $id_user;

        return $this;
    }

    public function getIdCar(): ?Car
    {
        return $this->id_car;
    }

    public function setIdCar(?Car $id_car): self
    {
        $this->id_car = $id_car;

        return $this;
    }

    public function getValue(): ?int
    {
        return $this->value;
    }

    public function setValue(int $value): self
    {
        $this->value = $value;

        return $this;
    }

    public function getWhenBooked(): ?\DateTimeInterface
    {
        return $this->when_booked;
    }

    public function setWhenBooked(\DateTimeInterface $when_booked): self
    {
        $this->when_booked = $when_booked;

        return $this;
    }

    public function getWhenDue(): ?\DateTimeInterface
    {
        return $this->when_due;
    }

    public function setWhenDue(\DateTimeInterface $when_due): self
    {
        $this->when_due = $when_due;

        return $this;
    }

    public function getPickUp(): ?Location
    {
        return $this->pick_up;
    }

    public function setPickUp(?Location $pick_up): self
    {
        $this->pick_up = $pick_up;

        return $this;
    }

    public function getDropOff(): ?Location
    {
        return $this->drop_off;
    }

    public function setDropOff(?Location $drop_off): self
    {
        $this->drop_off = $drop_off;

        return $this;
    }
}
