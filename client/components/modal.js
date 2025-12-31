$(document).ready(function() {
    
    
    
    // Prevent form default submission (e.g., when user presses Enter)
    $('#observationForm').on('submit', function(e) {
        e.preventDefault();
    });

    $('#saveObservation').on('click', function(e) {
        e.preventDefault();
        
        // Get form element
        const form = document.getElementById('observationForm');
        
        // Validate form
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        // Collect form data
        const formData = {
            title: $('#title').val(),
            latinName: $('#latinname').val(),
            location: $('#observation-location').val(),
            date: $('#date').val()
        };
        
        // Convert to JSON
        const jsonData = JSON.stringify(formData);
        
        // Send AJAX POST request
        $.ajax({
            url: API_CONFIG.baseURL + API_CONFIG.endpoints.observations.create,
            type: 'POST',
            contentType: 'application/json',
            data: jsonData,
            success: function (response) {
                console.log('Beobachtung erfolgreich erstellt:', response);
                
                // Close modal
                $('#observationModal').modal('hide');
                
                // Reset form
                form.reset();
                
                // Show success alert
                alert('Beobachtung erfolgreich hinzugefügt!');
            },
            error: function (xhr, status, error) {
                console.error('Fehler beim Erstellen der Beobachtung:', error);
                
                // Show error message with details
                const errorMessage = xhr.responseJSON?.error || error;
                alert('Fehler: ' + errorMessage);
            }
        });
    });
});