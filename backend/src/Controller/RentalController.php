<?php


namespace App\Controller;


use App\Entity\Car;
use App\Entity\Location;
use App\Entity\Rental;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use const Amp\Socket\LOOP_CONNECTOR_IDENTIFIER;

class RentalController extends AbstractController
{
    private EntityManagerInterface $em;
    private TokenStorageInterface $tokenStorage;

    public function __construct(EntityManagerInterface $em, TokenStorageInterface $tokenStorage)
    {
        $this->em = $em;
        $this->tokenStorage = $tokenStorage;
    }

    /**
     * @Route("/api/rentals", name="addRental", methods="POST")
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function addRental(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $carId = $data["car"] ?? null;
        $pickUpLocationId =  $data["pickUpLocation"] ?? null;
        $dropOffLocationId = $data["dropOffLocation"]  ?? null;
        $whenBooked =  new \DateTime($data["whenBooked"]) ?? null;
        $whenDue = new \DateTime($data["whenDue"])  ?? null;
        $value = $data["value"]  ?? null;

        // retrieving the user from the token
        $token = $this->tokenStorage->getToken();
        $renter = $token->getUser();

        $pickLoc = $this->em->getRepository(Location::class)->find($pickUpLocationId);
        $dropLoc = $this->em->getRepository(Location::class)->find($dropOffLocationId);
        $car = $this->em->getRepository(Car::class)->find($carId);

        if ($car->getStock() == 0) {
            return $this->json(["message" => "This car is currently out of stock"], Response::HTTP_CONFLICT);
        }
        $rental = new Rental();
        $rental->setRenter($renter)
            ->setCar($car)
            ->setPickUpLocation($pickLoc)
            ->setDropOffLocation($dropLoc)
            ->setWhenBooked($whenBooked)
            ->setWhenDue($whenDue)
            ->setValue($value);

        $car->setStock($car->getStock() - 1);

        $this->em->persist($rental);
        $this->em->flush();

        return $this->json(["message" => "Successfully made a reservation"], Response::HTTP_CREATED);
    }
}