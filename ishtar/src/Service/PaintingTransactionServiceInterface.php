<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\Request;

interface PaintingTransactionServiceInterface
{
    public function create ($request);
    public function update( $request);
    public function delete( $request);
    public function getAll();
    public function getById($request);
}