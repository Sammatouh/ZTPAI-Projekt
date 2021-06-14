<?php

namespace App\Controller;

use App\Entity\Car;
use App\Entity\MediaObject;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class CarController
 * @package App\Controller
 */
class CarController extends AbstractController
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * @Route("/cars/{id}", name="getCar", methods="GET")
     * @param $id
     * @return JsonResponse
     */
    public function getCar($id): JsonResponse
    {
        $car = $this->em->getRepository(Car::class)->find($id);
        if ($car == null)
            return $this->json(["message" => "There is no car with such id", "code" => Response::HTTP_NOT_FOUND],
            Response::HTTP_NOT_FOUND);

        $image = $car->getImage();

        $response = new JsonResponse([
            'id' => $car->getId(),
            'brand' => $car->getBrand(),
            'name' => $car->getName(),
            'type' => $car->getType(),
            'doors' => $car->getDoors(),
            'info' => $car->getInfo(),
            'stock' => $car->getStock(),
            'pricePerDay' => $car->getPricePerDay(),
            'image' => '/media/'.$image->filePath
        ]);

        $response->setEncodingOptions($response->getEncodingOptions() | JSON_PRETTY_PRINT);

        return $response;
    }

    /**
     * @Route("/cars", name="addCar", methods="POST")
     * @param Request $request
     * @return JsonResponse
     */
    public function addCar(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $brand = $data["brand"] ?? null;
        $name = $data["name"] ?? null;
        $info = $data["info"] ?? null;
        $stock = $data["stock"] ?? null;
        $ppD = $data["pricePerDay"] ?? null;
        $imageIri = explode('/', $data["image"]) ?? null;
        $imageId = end($imageIri);
        $type = $data["type"] ?? null;
        $doors = $data["doors"] ?? null;

        if (!$this->addCarByDetails($brand, $name, $info, $stock, $ppD, $imageId, $type, $doors))
            return $this->json(
                ["message" => "Can't link car to the image | No such image", "code" => Response::HTTP_BAD_REQUEST],
                Response::HTTP_BAD_REQUEST);

        return $this->json(
            ["message" => "New car added", "code" => Response::HTTP_CREATED],
            Response::HTTP_CREATED);
    }

    /**
     * @Route("/cars", name="getAllCars", methods="GET")
     * @param Request $request
     * @return JsonResponse
     */
    public function getAllCars(Request $request): JsonResponse
    {
        $name = $request->query->get("name");
        $brand = $request->query->get("brand");
        $type = $request->query->get("type");
        $door = $request->query->get("door");
        $priceMin = $request->query->get("priceMin");
        $priceMax = $request->query->get("priceMax");
        $av = $request->query->get("av");

        $cars = $this->getCarsByFilters($name, $brand, $type, $door, $priceMin, $priceMax, $av);

        $response = new JsonResponse($this->arrayToJson($cars));
        $response->setEncodingOptions($response->getEncodingOptions() | JSON_PRETTY_PRINT);

        return $response;
    }

    private function addCarByDetails($brand, $name, $info, $stock, $ppD, $imageId, $type, $doors): bool
    {
        $image = $this->em->getRepository(MediaObject::class)->find($imageId);
        if ($image == null) return false;

        $car = new Car();
        $car->setBrand($brand)
            ->setName($name)
            ->setInfo($info)
            ->setStock($stock)
            ->setPricePerDay($ppD)
            ->setImage($image)
            ->setType($type)
            ->setDoors($doors);

        $this->em->persist($car);
        $this->em->flush();

        return true;
    }

    private function getCarsByFilters($name, $brand, $type, $door, $priceMin, $priceMax, $av): array
    {
        $qb = $this->em->createQueryBuilder();
        $qb->select('c', 'mo')
            ->from('App:Car', 'c')
            ->join('App:MediaObject', 'mo', 'WITH', 'c.image = mo');

        if ($name != null) $qb->andWhere('c.name LIKE :name')->setParameter('name', $name);
        if ($brand != null) $qb->andWhere('c.brand IN (:brand)')->setParameter('brand', explode(',', $brand));
        if ($type != null) $qb->andWhere('c.type IN (:type)')->setParameter('type', explode(',', $type));
        if ($door != null) $qb->andWhere('c.doors IN (:door)')->setParameter('door', array_map('intval', explode(',', $door)));
        if ($priceMin != null) $qb->andWhere('c.pricePerDay >= :priceMin')->setParameter('priceMin', intval($priceMin)*100);
        if ($priceMax != null) $qb->andWhere('c.pricePerDay <= :priceMax')->setParameter('priceMax', intval($priceMax)*100);
        if ($av != null) $qb->andWhere('c.stock > :zero')->setParameter('zero', 0);

        return $qb->getQuery()->getScalarResult();
    }

    private function arrayToJson(array $arr): array
    {
        $response = array();
        foreach ($arr as $ar)
        {
            $response[] = array(
                'id' => $ar['c_id'],
                'brand' => $ar['c_brand'],
                'name' => $ar['c_name'],
                'type' => $ar['c_type'],
                'doors' => $ar['c_doors'],
                'info' => $ar['c_info'],
                'stock' => $ar['c_stock'],
                'pricePerDay' => $ar['c_pricePerDay'],
                'image' => '/media/'.$ar['mo_filePath']
            );
        }
        return $response;
    }
}
