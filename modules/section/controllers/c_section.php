<?php (defined('BASEPATH')) OR exit('No direct script access allowed');
/*
|---------------------------------
| Ardian Webi Kirda 
| Copyright Ardian Webi Kira 
| Created By ian  18-01-2015
| Supported by Vikosha Perdana
|---------------------------------
*/
class C_section extends IAN_Controller{

	public function __construct(){
		parent::__construct();
		$this->load->model('section/m_section');
	}

	public function getSection(){
        $start      = ($this->input->get('start', TRUE) ? $this->input->get('start', TRUE) : 0);
        $limit      = ($this->input->get('limit', TRUE) ? $this->input->get('limit', TRUE) : 20);
		
		$result 		= $this->m_section->getGridSect($start, $limit);
		$resultCount 	= $this->m_section->countGridSect();
		$count 			= $resultCount->num_rows();

		foreach ($result->result() as $key => $value) {
			$data['data'][]=array(
				'id' 			=> $value->id,
				'id_dept'		=> $value->id_dept,
				'name_dept' 	=> $value->name_dept,
				'name_sect' 	=> $value->name_sect,
				'active'		=> $value->active
			);
		}

		$data['total'] 		= $count;
		$data['success']	= true;
		echo json_encode($data);
	}

	public function delSection(){
		$data = json_decode($this->input->post('post'));
		foreach ($data as $row) {
			$cekResult = $this->m_section->cekRelasi($row->id);

			if($cekResult == 0){
				$this->m_section->deleteSect($row->id);
				$data['msg']=0;
			} else {
				$data['msg']=1;
			}
		}
		echo json_encode($data);
	}

	public function saveSection(){
		$uuid       = $this->m_section->getUUID();
		$id_dept    = ($this->input->post('id_dept', TRUE) ? $this->input->post('id_dept', TRUE) : '');
		$name_sect  = ($this->input->post('name_sect', TRUE) ? $this->input->post('name_sect', TRUE) : '');
		$active = ($this->input->post('active', TRUE) ? $this->input->post('active', TRUE) : '');
    	if($active == TRUE) { 
    		$active = 'Y'; 
    	} else { 
    		$active = 'N'; 
    	}

    	if(empty($name_sect)){
    		$success = 3;
    	} elseif($this->m_section->cekData($name_sect) == 0){
    		$this->m_section->saveSect($uuid, $id_dept, $name_sect, $active);
    		$success = 1;
    	} else {
    		$success = 2;
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
    	echo json_encode($data);    	
	}

	public function editSection(){
		$id 		= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$id_dept    = ($this->input->post('id_dept', TRUE) ? $this->input->post('id_dept', TRUE) : '');
		$name_sect  = ($this->input->post('name_sect', TRUE) ? $this->input->post('name_sect', TRUE) : '');
		$active 	= ($this->input->post('active', TRUE) ? $this->input->post('active', TRUE) : '');
		if($active == TRUE) { 
    		$active = 'Y'; 
    	} else { 
    		$active = 'N'; 
    	}

    	if(empty($name_sect)){
    		$success = 2;
    	} else {
    		$this->m_section->updateSect($id, $id_dept, $name_sect, $active);
    		$success = 1;
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
    	echo json_encode($data);   

	}

	public function searchSection(){
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    	$result 	= $this->m_section->searchSect($name);
    	foreach ($result->result() as $key => $value) {
			$data['data'][]=array(
				'id' 			=> $value->id,
				'id_dept'		=> $value->id_dept,
				'name_dept' 	=> $value->name_dept,
				'name_sect' 	=> $value->name_sect,
				'active'		=> $value->active
			);
		}
		$data['success']	= true;
		echo json_encode($data);
	}
}