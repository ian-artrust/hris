<?php (defined('BASEPATH')) OR exit('No direct script access allowed');
/*
|---------------------------------
| Ardian Webi Kirda 
| Copyright Ardian Webi Kira 
| Created By ian  18-01-2015
| Supported by Vikosha Perdana
|---------------------------------
*/
class C_shiftkerja extends IAN_Controller{

	public function __construct(){
		parent::__construct();
		$this->load->model('shiftkerja/m_shiftkerja');
	}

	public function getShiftkerja(){
        $start      = ($this->input->get('start', TRUE) ? $this->input->get('start', TRUE) : 0);
        $limit      = ($this->input->get('limit', TRUE) ? $this->input->get('limit', TRUE) : 20);
		
		$result 		= $this->m_shiftkerja->getGridShiftkerja($start, $limit);
		$resultCount 	= $this->m_shiftkerja->countGridShiftkerja();
		$count 			= $resultCount->num_rows();

		foreach ($result->result() as $key => $value) {
			$data['data'][]=array(
				'id' 			=> $value->id,
				'name_shift'	=> $value->name_shift,
			);
		}

		$data['total'] 		= $count;
		$data['success']	= true;
		echo json_encode($data);
	}

	public function delShiftkerja(){
		$data = json_decode($this->input->post('post'));
		foreach ($data as $row) {
			// $cekResult = $this->m_shiftkerja->cekRelasi($row->id);

			// if($cekResult == 1){
				$this->m_shiftkerja->deleteShiftkerja($row->id);
				$data['msg']=0;
			// } else {
			// 	$data['msg']=1;
			// }
		}
		echo json_encode($data);
	}

	public function saveShiftkerja(){
		$uuid         	= $this->m_shiftkerja->getUUID();
		$name_shift  	= ($this->input->post('name_shift', TRUE) ? $this->input->post('name_shift', TRUE) : '');
    	

    	if(empty($name_shift)){
    		$success = 3;
    	} elseif($this->m_shiftkerja->cekData($name_shift) == 0){
    		$this->m_shiftkerja->saveShiftkerja($uuid, $name_shift);
    		$success = 1;
    	} else {
    		$success = 2;
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
    	echo json_encode($data);    	
	}

	public function editShiftkerja(){
		$id				= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$name_shift    	= ($this->input->post('name_shift', TRUE) ? $this->input->post('name_shift', TRUE) : '');
		
    	if(empty($name_shift)){
    		$success = 2;
    	} else {
    		$this->m_shiftkerja->updateShiftkerja($id, $name_shift);
    		$success = 1;
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
    	echo json_encode($data);

	}

	public function searchShiftkerja(){
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    	$result 	= $this->m_shiftkerja->searchShiftkerja($name);
    	foreach ($result->result() as $key => $value) {
			$data['data'][]=array(
				'id' 			=> $value->id,
				'name_shift'	=> $value->name_shift,
			);
		}
		$data['success']	= true;
		echo json_encode($data);
	}
}