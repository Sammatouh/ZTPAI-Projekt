<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\RentalRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"rental:read"}, "swagger_definition_name"="Read"},
 *     denormalizationContext={"groups"={"rental:write"}, "swagger_definition_name"="Write"}
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
     * @Groups({"rental:read", "rental:write"})
     */
    private $renter;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"rental:read"})
     */
    private $value;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"rental:read","rental:write"})
     */
    private $whenBooked;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"rental:read", "rental:write"})
     */
    private $whenDue;

    /**
     * @ORM\ManyToOne(targetEntity=Car::class)
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"rental:read", "rental:write"})
     */
    private $car;

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

    public function getCar(): ?Car
    {
        return $this->car;
    }

    public function setCar(?Car $car): self
    {
        $this->car = $car;

        return $this;
    }
}
