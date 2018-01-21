<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Jsonable;

use App\Http\Resources\Image as ImageResource;

use App\Image;

class ImageControllerAPI extends Controller
{
    public function getImages()
    {
        return ImageResource::collection(Image::all());
    }
    public function postImage(Request $request)
    {
       $exploded = explode(',', $request->imageVar);
       $decoded = base64_decode($exploded[1]);
       if (str_contains($exploded[0], 'jpeg')){
           $extention = 'jpg';
       }else{
           $extention = 'png';
       }

       $filename = str_random(10).'.'.$extention;

       $path = public_path().'/img/'.$filename;

       file_put_contents($path,$decoded);

        $image = new Image();
        $image->face='tile';
        $image->active = 1;
        $image->path =$filename;
        $image->save();
        return response()->json(new ImageResource($image), 201);

    }
}
