<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Jsonable;

use App\Http\Resources\User as UserResource;
use Illuminate\Support\Facades\DB;

use App\User;
use App\StoreUserRequest;
use Hash;

class UserControllerAPI extends Controller
{
    public function getUsers(Request $request)
    {
        if ($request->has('page')) {
            return UserResource::collection(User::paginate(5));
        } else {
            return UserResource::collection(User::all());
        }
    }
    public function delete($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(null, 204);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'nickname' => 'required|unique:users,nickname',
            'password' => 'min:3'
        ]);
        $user = new User();
        $user->fill($request->all());
        $user->password = Hash::make($user->password);
        $user->save();
        return response()->json(new UserResource($user), 201);
    }

    public function block(Request $request,$id)
    {

        $user = User::findOrFail($id);
        $user->blocked = 1;
        $user->reason_blocked = $request->reason_blocked;
        $user->save();
        return new UserResource($user);
    }

    public function active (Request $request, $id)
    {

        $user = User::findOrFail($id);
        $user->blocked = 0;
        $user->reason_reactivated = $request->reason_reactivated;
        $user->save();
        return new UserResource($user);
    }
}
