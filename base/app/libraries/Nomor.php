<?php (defined('BASEPATH')) OR exit('No direct script access allowed');
/*
|---------------------------------
| Ardian Webi Kirda Framework 
| Copyright Ardian Webi Kirda 
| Created By ian 18-01-2015
|---------------------------------
*/

class Nomor{

	public function add_number($nomor){
		$nomor 	= str_replace(" ", "", $nomor);
		$nomor 	= str_replace("-", "", $nomor);
		$nomor 	= str_replace(".", "", $nomor);

		if(! preg_match('/[^+0-9]/',trim($nomor))){
			if(substr(trim($nomor),0,3) == '+62'){
				$nomor = trim($nomor);
			} else if(substr(trim($nomor),0,1) == '0') {
				$nomor = substr_replace($nomor,'+62',0,1);
			}
		}
		return $nomor;	
	}

	public function read_number($nomor){
		if(substr(trim($nomor),0,3) == '+62') {
			$nomor = substr_replace($nomor,'0',0,3);
		} else {
			$nomor = $nomor;
		}

		return $nomor;
	}

}