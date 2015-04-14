<?php (defined('BASEPATH')) OR exit('No direct script access allowed');
/*
|---------------------------------
| Ardian Webi Kirda 
| Copyright Ardian Webi Kira 
| Created By ian  18-01-2015
| Supported by Vikosha Perdana
|---------------------------------
*/
class C_provinsi extends IAN_Controller{

	public function __construct(){
		parent::__construct();
		$this->load->model('provinsi/m_provinsi');
	}

	public function getProvinsi(){
        $start      = ($this->input->get('start', TRUE) ? $this->input->get('start', TRUE) : 0);
        $limit      = ($this->input->get('limit', TRUE) ? $this->input->get('limit', TRUE) : 20);
		
		$result 		= $this->m_provinsi->getGridProvinsi($start, $limit);
		$resultCount 	= $this->m_provinsi->countGridProvinsi();
		$count 			= $resultCount->num_rows();

		foreach ($result->result() as $key => $value) {
			$data['data'][]=array(
				'id' 			=> $value->id,
				'name_prov'		=> $value->name_prov
			);
		}

		$data['total'] 		= $count;
		$data['success']	= true;
		echo json_encode($data);
	}

	public function delProvinsi(){
		$data = json_decode($this->input->post('post'));
		foreach ($data as $row) {
			// $cekResult = $this->m_provinsi->cekRelasi($row->id);

			// if($cekResult == 0){
				$this->m_provinsi->deleteProvinsi($row->id);
				$data['msg']=0;
			// } else {
			// 	$data['msg']=1;
			// }
		}
		echo json_encode($data);
	}

	public function saveProvinsi(){
		$uuid         = $this->m_provinsi->getUUID();
		$name_prov    = ($this->input->post('name_prov', TRUE) ? $this->input->post('name_prov', TRUE) : '');

    	if(empty($name_prov)){
    		$success = 3;
    	} elseif($this->m_provinsi->cekData($name_prov) == 0){
    		$this->m_provinsi->saveProvinsi($uuid, $name_prov);
    		$success = 1;
    	} else {
    		$success = 2;
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
    	echo json_encode($data);    	
	}

	public function editProvinsi(){
		$id 			= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$name_prov    	= ($this->input->post('name_prov', TRUE) ? $this->input->post('name_prov', TRUE) : '');
		
    	if(empty($name_prov)){
    		$success = 2;
    	} else {
    		$this->m_provinsi->updateProvinsi($id, $name_prov);
    		$success = 1;
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
    	echo json_encode($data);

	}

	public function searchProvinsi(){
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    	$result 	= $this->m_provinsi->searchProvinsi($name);
    	foreach ($result->result() as $key => $value) {
			$data['data'][]=array(
				'id' 			=> $value->id,
				'name_prov'		=> $value->name_prov
			);
		}
		$data['success']	= true;
		echo json_encode($data);
	}
}