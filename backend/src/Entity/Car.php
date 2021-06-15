<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CarRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     normalizationContext={
 *          "groups"={"car_read"},
 *          "swagger_definition_name"="Read"
 *     },
 *     denormalizationContext={
 *          "groups"={"car_write"},
 *          "swagger_definition_name"="Write"
 *     },
 *     collectionOperations={"POST"},
 *     itemOperations={"GET", "PUT", "PATCH", "DELETE"})
 * @ORM\Entity(repositoryClass=CarRepository::class)
 */
class Car
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100)
     * @Groups({"car_read", "car_write"})
     */
    private $brand;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"car_read", "car_write"})
     */
    private $name;

    /**
     * @ORM\Column(type="text")
     * @Groups({"car_read", "car_write"})
     */
    private $info;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"car_read", "car_write"})
     */
    private $stock;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"car_read", "car_write"})
     */
    private $pricePerDay;

    /**
     * @var MediaObject|null
     *
     * @ORM\ManyToOne(targetEntity=MediaObject::class)
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"car_read", "car_write"})
     */
    public $image;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"car_read", "car_write"})
     */
    private $type;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"car_read", "car_write"})
     */
    private $doors;

    /**
     * @ORM\OneToMany(targetEntity=Rental::class, mappedBy="car")
     */
    private $rentals;

    public function __construct()
    {
        $this->rentals = new ArrayCollection();
    }

    /**
     * @return MediaObject|null
     */
    public function getImage(): ?MediaObject
    {
        return $this->image;
    }

    /**
     * @param MediaObject|null $image
     * @return Car
     */
    public function setImage(?MediaObject $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getInfo(): ?string
    {
        return $this->info;
    }

    public function setInfo(string $info): self
    {
        $this->info = $info;

        return $this;
    }

    public function getStock(): ?int
    {
        return $this->stock;
    }

    public function setStock(int $stock): self
    {
        $this->stock = $stock;

        return $this;
    }

    public function getPricePerDay(): ?int
    {
        return $this->pricePerDay;
    }

    public function setPricePerDay(int $pricePerDay): self
    {
        $this->pricePerDay = $pricePerDay;

        return $this;
    }

    public function getBrand(): ?string
    {
        return $this->brand;
    }

    public function setBrand(string $brand): self
    {
        $this->brand = $brand;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getDoors(): ?int
    {
        return $this->doors;
    }

    public function setDoors(int $doors): self
    {
        $this->doors = $doors;

        return $this;
    }

    /**
     * @return Collection|Rental[]
     */
    public function getRentals(): Collection
    {
        return $this->rentals;
    }

    public function addRental(Rental $rental): self
    {
        if (!$this->rentals->contains($rental)) {
            $this->rentals[] = $rental;
            $rental->setCar($this);
        }

        return $this;
    }

    public function removeRental(Rental $rental): self
    {
        if ($this->rentals->removeElement($rental)) {
            // set the owning side to null (unless already changed)
            if ($rental->getCar() === $this) {
                $rental->setCar(null);
            }
        }

        return $this;
    }
}
