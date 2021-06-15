<?php


namespace App\Controller;


use App\Entity\Location;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class LocationController extends AbstractController
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * @Route("/api/locations", name="getAllLocations", methods="GET")
     * @return JsonResponse
     */
    public function getLocations(): JsonResponse
    {
        $qb = $this->em->createQueryBuilder();
        $qb->select('l')
            ->from('App:Location', 'l');

        $locations = $qb->getQuery()->getScalarResult();

        $response = new JsonResponse($this->arrayToJson($locations));
        $response->setEncodingOptions($response->getEncodingOptions() | JSON_PRETTY_PRINT);

        return $response;
    }

    /**
     * @Route("/api/locations", name="addLocation", methods="POST")
     * @param Request $request
     * @return JsonResponse
     */
    public function addLocation(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $name = $data["name"];

        $loc = new Location();
        $loc->setName($name);

        $this->em->persist($loc);
        $this->em->flush();

        return $this->json(["message" => "Location added"], Response::HTTP_CREATED);
    }

    private function arrayToJson(array $arr): array
    {
        $res = array();
        foreach ($arr as $ar) {
            $res[] = array(
                'id' => $ar['l_id'],
                'name' => $ar['l_name']
            );
        }
        return $res;
    }
}