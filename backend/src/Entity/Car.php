<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CarRepository;
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
 *     collectionOperations={
 *         "post"={
 *              "security"="is_granted('ROLE_ADMIN')"
 *          },
 *          "get"
 *     })
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
    private $pricePerHour;

    /**
     * @var MediaObject|null
     *
     * @ORM\ManyToOne(targetEntity=MediaObject::class)
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"car_read", "car_write"})
     */
    public $image;

    /**
     * @return MediaObject|null
     */
    public function getImage(): ?MediaObject
    {
        return $this->image;
    }

    /**
     * @param MediaObject|null $image
     */
    public function setImage(?MediaObject $image): void
    {
        $this->image = $image;
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

    public function getPricePerHour(): ?int
    {
        return $this->pricePerHour;
    }

    public function setPricePerHour(int $pricePerHour): self
    {
        $this->pricePerHour = $pricePerHour;

        return $this;
    }
}
