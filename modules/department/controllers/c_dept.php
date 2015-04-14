<?php (defined('BASEPATH')) OR exit('No direct script access allowed');
/*
|---------------------------------
| Ardian Webi Kirda 
| Copyright Ardian Webi Kira 
| Created By ian  18-01-2015
| Supported by Vikosha Perdana
|---------------------------------
*/
class C_dept extends IAN_Controller{

	public function __construct(){
		parent::__construct();
		$this->load->model('department/m_dept');
	}

	public function getDepartment(){
        $start      = ($this->input->get('start', TRUE) ? $this->input->get('start', TRUE) : 0);
        $limit      = ($this->input->get('limit', TRUE) ? $this->input->get('limit', TRUE) : 20);
		
		$result 		= $this->m_dept->getGridDept($start, $limit);
		$resultCount 	= $this->m_dept->countGridDept();
		$count 			= $resultCount->num_rows();

		foreach ($result->result() as $key => $value) {
			$data['data'][]=array(
				'id' 			=> $value->id,
				'kode_dept'		=> $value->kode_dept,
				'name_dept' 	=> $value->name_dept,
				'active'		=> $value->active
			);
		}

		$data['total'] 		= $count;
		$data['success']	= true;
		echo json_encode($data);
	}

	public function delDepartment(){
		$data = json_decode($this->input->post('post'));
		foreach ($data as $row) {
			$cekResult = $this->m_dept->cekRelasi($row->id);

			if($cekResult == 0){
				$this->m_dept->deleteDept($row->id);
				$data['msg']=0;
			} else {
				$data['msg']=1;
			}
		}
		echo json_encode($data);
	}

	public function saveDepartment(){
		$uuid         = $this->m_dept->getUUID();
		$kode_dept    = ($this->input->post('kode_dept', TRUE) ? $this->input->post('kode_dept', TRUE) : '');
		$name_dept    = ($this->input->post('name_dept', TRUE) ? $this->input->post('name_dept', TRUE) : '');
		$active = ($this->input->post('active', TRUE) ? $this->input->post('active', TRUE) : '');
    	if($active == TRUE) { 
    		$active = 'Y'; 
    	} else { 
    		$active = 'N'; 
    	}

    	if(empty($kode_dept)){
    		$success = 3;
    	} elseif($this->m_dept->cekData($kode_dept) == 0){
    		$this->m_dept->saveDept($uuid, $kode_dept, $name_dept, $active);
    		$success = 1;
    	} else {
    		$success = 2;
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
    	echo json_encode($data);    	
	}

	public function editDepartment(){
		$id 		= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$kode_dept  = ($this->input->post('kode_dept', TRUE) ? $this->input->post('kode_dept', TRUE) : '');
		$name_dept  = ($this->input->post('name_dept', TRUE) ? $this->input->post('name_dept', TRUE) : '');
		$active 	= ($this->input->post('active', TRUE) ? $this->input->post('active', TRUE) : '');
		if($active == TRUE) { 
    		$active = 'Y'; 
    	} else { 
    		$active = 'N'; 
    	}

    	if(empty($kode_dept)){
    		$success = 2;
    	} else {
    		$this->m_dept->updateDept($id, $kode_dept, $name_dept, $active);
    		$success = 1;
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
    	echo json_encode($data);   

	}

	public function searchDepartment(){
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    	$result 	= $this->m_dept->searchDept($name);
    	foreach ($result->result() as $key => $value) {
			$data['data'][]=array(
				'id' 			=> $value->id,
				'kode_dept'		=> $value->kode_dept,
				'name_dept' 	=> $value->name_dept,
				'active'		=> $value->active
			);
		}
		$data['success']	= true;
		echo json_encode($data);
	}
}