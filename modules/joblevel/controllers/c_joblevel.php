<?php (defined('BASEPATH')) OR exit('No direct script access allowed');
/*
|---------------------------------
| Ardian Webi Kirda 
| Copyright Ardian Webi Kira 
| Created By ian  18-01-2015
| Supported by Vikosha Perdana
|---------------------------------
*/
class C_joblevel extends IAN_Controller{

	public function __construct(){
		parent::__construct();
		$this->load->model('joblevel/m_joblevel');
	}

	public function getJoblevel(){
        $start      = ($this->input->post('start', TRUE) ? $this->input->post('start', TRUE) : 0);
        $limit      = ($this->input->post('limit', TRUE) ? $this->input->post('limit', TRUE) : 20);
		
		$result 		= $this->m_joblevel->getGridJoblevel($start, $limit);
		$resultCount 	= $this->m_joblevel->countGridJoblevel();
		$count 			= $resultCount->num_rows();

		foreach ($result->result() as $key => $value) {
			$data['data'][]=array(
				'id' 				=> $value->id,
				'name_joblevel'		=> $value->name_joblevel,
				'ot' 				=> $value->ot,
				'active'			=> $value->active
			);
		}

		$data['total'] 		= $count;
		$data['success']	= true;
		echo json_encode($data);
	}

	public function delJoblevel(){
		$data = json_decode($this->input->post('post'));
		foreach ($data as $row) {
			$cekResult = $this->m_joblevel->cekRelasi($row->id);

			if($cekResult == 0){
				$this->m_joblevel->deleteJoblevel($row->id);
				$data['msg']=0;
			} else {
				$data['msg']=1;
			}
		}
		echo json_encode($data);
	}

	public function saveJoblevel(){
		$uuid         = $this->m_joblevel->getUUID();
		$name_joblevel    = ($this->input->post('name_joblevel', TRUE) ? $this->input->post('name_joblevel', TRUE) : '');
		$ot    = ($this->input->post('ot', TRUE) ? $this->input->post('ot', TRUE) : '');
		$active = ($this->input->post('active', TRUE) ? $this->input->post('active', TRUE) : '');

		if($ot == TRUE) { 
    		$ot = 'Y'; 
    	} else { 
    		$ot = 'N'; 
    	}

    	if($active == TRUE) { 
    		$active = 'Y'; 
    	} else { 
    		$active = 'N'; 
    	}

    	if(empty($name_joblevel)){
    		$success = 3;
    	} elseif($this->m_joblevel->cekData($name_joblevel) == 0){
    		$this->m_joblevel->saveJoblevel($uuid, $name_joblevel, $ot, $active);
    		$success = 1;
    	} else {
    		$success = 2;
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
    	echo json_encode($data);    	
	}

	public function editJoblevel(){
		$id 				= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$name_joblevel    	= ($this->input->post('name_joblevel', TRUE) ? $this->input->post('name_joblevel', TRUE) : '');
		$ot    				= ($this->input->post('ot', TRUE) ? $this->input->post('ot', TRUE) : '');
		$active 			= ($this->input->post('active', TRUE) ? $this->input->post('active', TRUE) : '');
		
		if($ot == TRUE) { 
    		$ot = 'Y'; 
    	} else { 
    		$ot = 'N'; 
    	}


		if($active == TRUE) { 
    		$active = 'Y'; 
    	} else { 
    		$active = 'N'; 
    	}

    	if(empty($name_joblevel)){
    		$success = 2;
    	} else {
    		$this->m_joblevel->updateJoblevel($id, $name_joblevel, $ot, $active);
    		$success = 1;
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
    	echo json_encode($data);

	}

	public function searchJoblevel(){
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    	$result 	= $this->m_joblevel->searchJoblevel($name);
    	foreach ($result->result() as $key => $value) {
			$data['data'][]=array(
				'id' 				=> $value->id,
				'name_joblevel'		=> $value->name_joblevel,
				'ot' 				=> $value->ot,
				'active'			=> $value->active
			);
		}
		$data['success']	= true;
		echo json_encode($data);
	}
}