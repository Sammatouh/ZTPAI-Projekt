<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * Class AuthController
 * @package App\Controller
 * @Route("api", name="api_")
 */
class AuthController extends AbstractController
{
    private $userRepository;
    private $passwordEncoder;

    public function __construct(UserRepository $userRepository,
                                UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->userRepository = $userRepository;
        $this->passwordEncoder = $passwordEncoder;
    }

    /**
     * @Route("/register", name="register", methods="POST")
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $email = isset($data['email']) ? $data['email'] : null;
        $password = isset($data['password']) ? $data['password'] : null;
        $name = isset($data['name']) ? $data['name'] : null;
        $surname = isset($data['surname']) ? $data['surname'] : null;
        $phone = isset($data['phone']) ? $data['phone'] : null;

        if ($this->userRepository->findOneBy(['email' => $email]))
            return $this->json(["message" => "User with this email already exists"],
                Response::HTTP_CONFLICT);

        $user = new User();
        $user->setEmail($email)
            ->setPassword($this->passwordEncoder->encodePassword($user, $password))
            ->setName($name)
            ->setSurname($surname)
            ->setPhone($phone)
            ->setJoinTime(new \DateTime());


        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json(["message" => "User created",
            "email" => $email],
            Response::HTTP_CREATED);
    }
}