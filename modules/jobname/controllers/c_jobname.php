<?php (defined('BASEPATH')) OR exit('No direct script access allowed');
/*
|---------------------------------
| Ardian Webi Kirda 
| Copyright Ardian Webi Kira 
| Created By ian  18-01-2015
| Supported by Vikosha Perdana
|---------------------------------
*/
class C_jobname extends IAN_Controller{

	public function __construct(){
		parent::__construct();
		$this->load->model('jobname/m_jobname');
	}

	public function getJobname(){
        $start      = ($this->input->post('start', TRUE) ? $this->input->post('start', TRUE) : 0);
        $limit      = ($this->input->post('limit', TRUE) ? $this->input->post('limit', TRUE) : 20);
		
		$result 		= $this->m_jobname->getGridJobname($start, $limit);
		$resultCount 	= $this->m_jobname->countGridJobname();
		$count 			= $resultCount->num_rows();

		foreach ($result->result() as $key => $value) {
			$data['data'][]=array(
				'id' 			=> $value->id,
				'id_sect' 		=> $value->id_sect,
				'id_joblevel'	=> $value->id_joblevel,
				'name_sect'		=> $value->name_sect,
				'name_joblevel'	=> $value->name_joblevel,
				'jobname' 		=> $value->jobname,
				'active'		=> $value->active
			);
		}



		$data['total'] 		= $count;
		$data['success']	= true;
		echo json_encode($data);
	}

	public function delJobname(){
		$data = json_decode($this->input->post('post'));
		foreach ($data as $row) {
			$cekResult = $this->m_jobname->cekRelasi($row->id);

			if($cekResult == 0){
				$this->m_jobname->deleteJobname($row->id);
				$data['msg']=0;
			} else {
				$data['msg']=1;
			}
		}
		echo json_encode($data);
	}

	public function saveJobname(){
		$uuid      	 	= $this->m_jobname->getUUID();
		$id_sect    	= ($this->input->post('id_sect', TRUE) ? $this->input->post('id_sect', TRUE) : '');
		$id_joblevel   	= ($this->input->post('id_joblevel', TRUE) ? $this->input->post('id_joblevel', TRUE) : '');
		$jobname 		= ($this->input->post('jobname', TRUE) ? $this->input->post('jobname', TRUE) : '');
		$active 		= ($this->input->post('active', TRUE) ? $this->input->post('active', TRUE) : '');
    	if($active == TRUE) { 
    		$active = 'Y'; 
    	} else { 
    		$active = 'N'; 
    	}

    	if(empty($jobname)){
    		$success = 3;
    	} elseif($this->m_jobname->cekData($jobname) == 0){
    		$this->m_jobname->saveJobname($uuid, $id_sect, $id_joblevel, $jobname, $active);
    		$success = 1;
    	} else {
    		$success = 2;
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
    	echo json_encode($data);    	
	}

	public function editJobname(){
		$id 			= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$id_sect  		= ($this->input->post('id_sect', TRUE) ? $this->input->post('id_sect', TRUE) : '');
		$id_joblevel   	= ($this->input->post('id_joblevel', TRUE) ? $this->input->post('id_joblevel', TRUE) : '');
		$jobname 		= ($this->input->post('jobname', TRUE) ? $this->input->post('jobname', TRUE) : '');
		$active 		= ($this->input->post('active', TRUE) ? $this->input->post('active', TRUE) : '');
		if($active == TRUE) { 
    		$active = 'Y'; 
    	} else { 
    		$active = 'N'; 
    	}

    	if(empty($jobname)){
    		$success = 2;
    	} else {
    		$this->m_jobname->updateJobname($id, $id_sect, $id_joblevel, $jobname, $active);
    		$success = 1;
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
    	echo json_encode($data);   

	}

	public function searchJobname(){
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    	$result 	= $this->m_jobname->searchJobname($name);
    	foreach ($result->result() as $key => $value) {
			$data['data'][]=array(
				'id' 			=> $value->id,
				'id_sect' 		=> $value->id_sect,
				'id_joblevel'	=> $value->id_joblevel,
				'name_sect'		=> $value->name_sect,
				'name_joblevel'	=> $value->name_joblevel,
				'jobname' 		=> $value->jobname,
				'active'		=> $value->active
			);
		}
		$data['success']	= true;
		echo json_encode($data);
	}
}