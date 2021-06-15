<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\RentalRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     normalizationContext={
 *          "groups"={"rental_read"}, 
 *          "swagger_definition_name"="Read"
 *     },
 *     denormalizationContext={
 *          "groups"={"rental_write"}, 
 *          "swagger_definition_name"="Write"
 *     },
 * )
 * @ORM\Entity(repositoryClass=RentalRepository::class)
 */
class Rental
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="rentals")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"rental_read", "rental_write"})
     */
    private $renter;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"rental_read", "rental_write"})
     */
    private $value;

    /**
     * @ORM\ManyToOne(targetEntity=Car::class)
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"rental_read", "rental_write"})
     */
    private $car;

    /**
     * @ORM\ManyToOne(targetEntity=Location::class)
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"rental_read", "rental_write"})
     */
    private $pickUpLocation;

    /**
     * @ORM\ManyToOne(targetEntity=Location::class)
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"rental_read", "rental_write"})
     */
    private $dropOffLocation;

    /**
     * @ORM\Column(type="date")
     * @Groups({"rental_read", "rental_write"})
     */
    private $whenBooked;

    /**
     * @ORM\Column(type="date")
     * @Groups({"rental_read", "rental_write"})
     */
    private $whenDue;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRenter(): ?User
    {
        return $this->renter;
    }

    public function setRenter(?User $renter): self
    {
        $this->renter = $renter;

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

    public function getCar(): ?Car
    {
        return $this->car;
    }

    public function setCar(?Car $car): self
    {
        $this->car = $car;

        return $this;
    }

    public function getPickUpLocation(): ?Location
    {
        return $this->pickUpLocation;
    }

    public function setPickUpLocation(?Location $pickUpLocation): self
    {
        $this->pickUpLocation = $pickUpLocation;

        return $this;
    }

    public function getDropOffLocation(): ?Location
    {
        return $this->dropOffLocation;
    }

    public function setDropOffLocation(?Location $dropOffLocation): self
    {
        $this->dropOffLocation = $dropOffLocation;

        return $this;
    }

    public function getWhenBooked(): ?\DateTimeInterface
    {
        return $this->whenBooked;
    }

    public function setWhenBooked(\DateTimeInterface $whenBooked): self
    {
        $this->whenBooked = $whenBooked;

        return $this;
    }

    public function getWhenDue(): ?\DateTimeInterface
    {
        return $this->whenDue;
    }

    public function setWhenDue(\DateTimeInterface $whenDue): self
    {
        $this->whenDue = $whenDue;

        return $this;
    }
}
